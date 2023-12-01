using Finance.Models;
using Finance.Services;
using Finance.ViewModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Globalization;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DespesaController : ControllerBase
    {
        private readonly DespesaService _despesaService;
        private readonly CadContaService _cadContaService;
        private readonly CadCartaoService _cadCartaoService;

        private readonly IMongoQueryable<Despesa> _despesaCollection;
        private readonly IMongoQueryable<CadCartao> _cadCartaoCollection;
        private readonly IMongoQueryable<CadConta> _cadContaCollection;

        public DespesaController(DespesaService despesaService,
            CadContaService cadContaService, CadCartaoService cadCartaoService,
            IMongoDatabase mongoDatabase)
        {
            _despesaService = despesaService;
            _cadContaService = cadContaService;
            _cadCartaoService = cadCartaoService;

            _cadCartaoCollection = mongoDatabase.GetCollection<CadCartao>("cadcartao").AsQueryable();
            _cadContaCollection = mongoDatabase.GetCollection<CadConta>("cadconta").AsQueryable();
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
                s.Valor,
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
            var isCartao = await _cadCartaoCollection
                .Where(w => w.Id == newDespesa.ContaCartaoId)
                .AnyAsync();


            var conta = new CadConta();
            var cartao =  new CadCartao();

            if (isCartao)
            {
                cartao = await _cadCartaoCollection
                    .Where(w => w.Id == newDespesa.ContaCartaoId)
                    .SingleAsync();
            }
            else
            {
                conta = await _cadContaCollection
                    .Where(w => w.Id == newDespesa.ContaCartaoId)
                    .SingleAsync();
            }

            await _despesaService.CreateAsync(newDespesa: newDespesa, cadConta: conta, cadCartao: cartao, isCartao: isCartao);

            return Ok();
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, DespesaViewModel despesaView)
        {
            // Se o id que eu receber ta no cartao ele vai attualizar ele se nao o contrario
            var isCartao = await _cadCartaoCollection
                .Where(w => w.Id == despesaView.ContaCartaoId)
                .AnyAsync();

            var conta = new CadConta();
            var cartao = new CadCartao();

            if (isCartao)
            {
                cartao = await _cadCartaoCollection
                    .Where(w => w.Id == despesaView.ContaCartaoId)
                    .SingleAsync();
            }
            else
            {
                conta = await _cadContaCollection
                    .Where(w => w.Id == despesaView.ContaCartaoId)
                    .SingleAsync();
            }


            await _despesaService.UpdateAsync(id: id,
                despesaView: despesaView,
                cadConta: conta,
                cadCartao: cartao,
                isCartao: isCartao);

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
