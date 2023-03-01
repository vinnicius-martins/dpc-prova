using Data;
using Data.Models;
using Data.RequestObjects;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [EnableCors]
    public class ContabilidadeController : ControllerBase
    {
        private readonly DPC_Context _context;
        public ContabilidadeController(DPC_Context context)
        {
            _context = context;
        }
        
        [HttpGet("clientes/{ClienteId}/contabilidades")]
        public ActionResult GetContabilidades([FromQuery] int ClienteId)
        {
            try
            {
                Cliente? empresa = _context.Cliente
                    .Where(empresa => empresa.Codigo == ClienteId)
                    .FirstOrDefault();

                if (empresa == null) return StatusCode(404);

                return Ok(empresa.Contabilidades);
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        [HttpPost("clientes/{ClienteId}/contabilidades")]
        public ActionResult CreateContabilidade([FromQuery] int ClienteId, [FromBody] ContabilidadeObject contabilidadeData)
        {
            try
            {
                Contabilidade contabilidade = new()
                {
                    Nome = contabilidadeData.Nome,
                    DataInicio = contabilidadeData.DataInicio,
                    DataFim = contabilidadeData.DataFim,
                    ClienteId = ClienteId,
                };

                Cliente? Cliente = _context.Cliente.Find(ClienteId);

                if (Cliente is null) return StatusCode(400);

                Cliente.Contabilidades.Add(contabilidade);
                _context.SaveChanges();

                return StatusCode(201, contabilidade);
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        /*[HttpPut("clientes/{ClienteId}/contabilidades/{id}")]
        public ActionResult AlterContabilidade(int empresaId, [FromQuery] int id, [FromBody] Delta<Contato> contatoData)
        {
            try
            {
                Empresa? empresa = _context.Empresa.Find(id);

                if (empresa is null) return StatusCode(400);

                contatoData.Patch(empresa);

                _context.SaveChanges();

                return StatusCode(200, empresa);
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }*/
    }
}
