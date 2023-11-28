using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/cadcartao")]
    public class CadCartaoController : ControllerBase
    {
        private readonly CadCartaoService _cadCartaoService;

        public CadCartaoController(CadCartaoService cadCartaoService)
        {
            _cadCartaoService = cadCartaoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CadCartao>>> GetCartao()
        {
            var cartao = await _cadCartaoService.GetAsync();
            return Ok(cartao);
        }

        [HttpPost]
        public async Task<ActionResult<CadCartao>> PostCartao(CadCartao newCadCartao)
        {
            await _cadCartaoService.CreateAsync(newCadCartao);
            return CreatedAtAction(nameof(GetCartao), new { id = newCadCartao.Id }, newCadCartao);
        }


        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteCartao(string id)
        {
            var cartao = await _cadCartaoService.GetAsync(id);

            await _cadCartaoService.RemoveAsync(id);

            return NoContent();
        }

        //[HttpGet("soma/{cartaoId:length(24)}")]
        //public async Task<IActionResult> GetSomaFatura (string cartaoId, CancellationToken cancellationToken)
        //{
        //    try
        //    {
        //        var despesaDoCartao = await _despesaService.GetDespesasPorCartaoAsync(cartaoId, cancellationToken);

        //        if (!despesaDoCartao.Any())
        //        {
        //            despesaDoCartao.Add(new Despesa
        //            {
        //                Valor = 0
        //            });
        //        }

        //        var somaDespesa = despesaDoCartao.Sum(despesa => despesa.Valor);
        //        return Ok(new { SomaDespesa  = somaDespesa });
        //    } catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Erro ao calcular a soma das despesas: {ex.Message}");
        //    }
        //}
    }
}
