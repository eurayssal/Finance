using Finance.Models;
using Finance.Services;
using Finance.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DespesaController : ControllerBase
    {
        private readonly DespesaService _despesaService;
        private readonly CadContaService _cadContaService;

        public DespesaController(DespesaService despesaService, CadContaService cadContaService)
        {
            _despesaService = despesaService;
            _cadContaService = cadContaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Despesa>>> GetDespesas() =>
            Ok(await _despesaService.GetAsync());

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Despesa>> GetDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }

            return despesa;
        }
        [HttpPost]
        public async Task<IActionResult> Post(DespesaViewModel newDespesa)
        {
            var conta = await _cadContaService.GetAsync(newDespesa.ContaId);
            await _despesaService.CreateAsync(newDespesa, conta);
            return Ok();
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Despesa updatedDespesa, string contaId)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa is null)
            {
                return NotFound();
            }

            updatedDespesa.ContaId = contaId;
            await _despesaService.UpdateAsync(id, updatedDespesa, contaId);

            return Ok(new
            {
                updatedDespesa.Id,
                updatedDespesa.Nome,
                updatedDespesa.Valor,
            });
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }

            await _despesaService.RemoveAsync(id);

            return NoContent();
        }

        [HttpGet("soma")]
        public async Task<IActionResult> GetSomaDespesas(CancellationToken cancellationToken)
        {
            try
            {
                var somaDespesas = await _despesaService.SomaDespesaAsync(cancellationToken);

                return Ok(new { SomaDespesas = somaDespesas });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao calcular a soma das despesas: {ex.Message}");
            }
        }
    }
}
