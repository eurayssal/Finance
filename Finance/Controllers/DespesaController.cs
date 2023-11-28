using Finance.Models;
using Finance.Services;
using Finance.ViewModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
        private readonly CadCartaoService _cadCartaoService;

        private readonly IMongoCollection<Despesa> _despesaCollection;
        private readonly IMongoCollection<CadCartao> _cadCartaoCollection;
        private readonly IMongoCollection<CadConta> _cadContaCollection;



        public DespesaController(DespesaService despesaService,
            CadContaService cadContaService, CadCartaoService cadCartaoService,
            IMongoDatabase mongoDatabase)
        {
            _despesaService = despesaService;
            _cadContaService = cadContaService;
            _cadCartaoService = cadCartaoService;

            _cadCartaoCollection = mongoDatabase.GetCollection<CadCartao>("cadcartao");
            _cadContaCollection = mongoDatabase.GetCollection<CadConta>("cadconta");
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
                s.ContaName,
                s.CartaoId,
                s.CartaoName,
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
            var cartao = await _cadCartaoCollection.Find(x => x.Id == newDespesa.ContaCartaoId).FirstOrDefaultAsync();

            if (cartao == null)
            {
                var conta = await _cadContaCollection.Find(x => x.Id == newDespesa.ContaCartaoId).FirstOrDefaultAsync();
                await _despesaService.CreateAsync(newDespesa, conta, null);
            }
            else
            {
                await _despesaService.CreateAsync(newDespesa, null, cartao);
            }

            return Ok();
        }

        //[HttpPut("{id:length(24)}")]
        //public async Task<IActionResult> Update(string id, DespesaViewModel despesaViewModel)
        //{
        //    var conta = await _cadContaService.GetAsync(despesaViewModel.ContaId);
        //    var cartao = await _cadCartaoService.GetAsync(despesaViewModel.CartaoId);
        //    await _despesaService.UpdateAsync(id, despesaViewModel, conta, cartao);

        //    return Ok();
        //}

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
