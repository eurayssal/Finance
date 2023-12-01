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

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> UpdateCartao(string id, CadCartao updateCadCartao)
        {
            var cartao = await _cadCartaoService.GetAsync(id);

            if(cartao == null)
            {
                return NoContent();
            }

            cartao.Nome = updateCadCartao.Nome;
            cartao.DiaFechamento = updateCadCartao.DiaFechamento;
            cartao.DiaVencimento = updateCadCartao.DiaVencimento;
            cartao.Atividade = updateCadCartao.Atividade;

            await _cadCartaoService.UpdateAsync(id, cartao);

            return Ok(new
            {
                cartao.Id,
                cartao.Nome,
                cartao.DiaFechamento,
                cartao.DiaVencimento,
                cartao.Atividade
            });
            
        }
    }
}
