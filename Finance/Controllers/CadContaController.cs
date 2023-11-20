using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/cadconta")]
    public class CadContaController : ControllerBase
    {
        private readonly CadContaService _cadContaSerce;

        public CadContaController(CadContaService cadContaSerce)
        {
            _cadContaSerce = cadContaSerce;
        }

        [HttpGet]
        public async Task<ActionResult<List<CadConta>>> GetContas()
        {
            var contas = await _cadContaSerce.GetAsync();
            return Ok(contas);
        }

        [HttpPost]
        public async Task<ActionResult<CadConta>> PostConta(CadConta newCadConta)
        {
            await _cadContaSerce.CreateAsync(newCadConta);
            return CreatedAtAction(nameof(GetContas), new { id = newCadConta.Id }, newCadConta);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteConta(string id)
        {
            var conta = await _cadContaSerce.GetAsync(id);

            await _cadContaSerce.RemoveAsync(id);

            return NoContent();
        }
    }
}
