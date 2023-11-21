using Finance.Models;
using Finance.Services;
using Finance.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        public async Task<ActionResult<List<Despesa>>> GetDespesas()
        {
            List<Despesa> despesas = await _despesaService.GetAsync();

            return Ok(despesas.Select(s => new
            {
                s.Id,
                s.Nome,
                s.ContaId,
                s.CartaoId,
                s.ContaName,
                s.Status,
                Valor = s.Valor.ToString("C", new CultureInfo("pt-BR")),
                s.Data,
            }).ToList());
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Despesa>> GetDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

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
        public async Task<IActionResult> Update(string id, DespesaViewModel despesaViewModel)
        {
            var conta = await _cadContaService.GetAsync(despesaViewModel.ContaId);
            await _despesaService.UpdateAsync(id, despesaViewModel, conta);

            return Ok();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteDespesa(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

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
