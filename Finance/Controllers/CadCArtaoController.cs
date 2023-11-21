using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;

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
            var cartoes = await _cadCartaoService.GetAsync();
            return (cartoes);
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
    }
}
