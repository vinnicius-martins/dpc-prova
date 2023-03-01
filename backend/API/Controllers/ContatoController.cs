using Data;
using Data.Models;
using Data.RequestObjects;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace backend.Controllers
{
    [ApiController]
    [EnableCors]
    public class ContatoController : ControllerBase
    {
        private readonly DPC_Context _context;
        public ContatoController(DPC_Context context)
        {
            _context = context;
        }

        [HttpGet("clientes/{ClienteId}/contatos")]
        public ActionResult GetContatos(int ClienteId)
        {
            try
            {
                return Ok(_context.Contato.Where(x => x.ClienteId == ClienteId).ToList());
            } catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        [HttpPost("clientes/{ClienteId}/contatos")]
        public ActionResult CreateContato(int ClienteId, [FromBody] ContatoObject contatoData)
        {
            try {
                Contato contato = new()
                {
                    Nome = contatoData.Nome,
                    Email = contatoData.Email,
                    Status = contatoData.Status,
                    Telefone = contatoData.Telefone,
                    ClienteId = ClienteId
                };

                var cliente = _context.Cliente
                   .Include(x => x.Contatos)
                   .FirstOrDefault(x => x.Codigo == ClienteId);

                if (cliente is null) return StatusCode(400);

                cliente.Contatos.Add(contato);
                _context.SaveChanges();
                
                return StatusCode(201, contato);
            } 
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        /*[HttpPut("clientes/{ClienteId}/contatos{id}")]
        public ActionResult AlterContato(int empresaId, int id, [FromBody] Delta<Contato> contatoData)
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
