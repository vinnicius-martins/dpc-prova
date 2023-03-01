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
    public class ClientesController : ControllerBase
    {
        private readonly DPC_Context _context;
        public ClientesController(DPC_Context context)
        {
            _context = context;
        }

        [HttpGet("clientes")]
        public ActionResult GetClientes()
        {
            try
            {   
                return Ok(_context.Cliente.ToList());
            } catch (Exception error)
            {
                return StatusCode(500, error.ToString());
            }
        }

        [HttpGet("clientes/{id}")]
        public ActionResult GetClienteById(int id)
        {
            try
            {
                Cliente? cliente = _context.Cliente.Find(id);

                if (cliente is null) return StatusCode(404);
                
                return Ok(cliente);
            } catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        [HttpPost("clientes")]
        public ActionResult CreateCliente([FromBody] ClienteObject ClienteData)
        {
            try
            {
                Sistema? sistema = _context.Sistema.Find(ClienteData.sistemaId);
                if (sistema is null) return StatusCode(400);

                Cliente Cliente = new()
                {
                    Nome = ClienteData.nome,
                    Ativo = ClienteData.ativo,
                    DataInicio = ClienteData.dataInicio,
                    SistemaId = ClienteData.sistemaId,
                    Sistema = sistema,
                    MoedaEstrangeira = ClienteData.moedaEstrangeira,
                    NecessitaMarketing = ClienteData.necessitaMarketing,
                    NecessitaTI = ClienteData.necessitaTI,
                    VIP = ClienteData.vip,
                };

                _context.Cliente.Add(Cliente);
                _context.SaveChanges();
                
                return StatusCode(201, Cliente);
            } 
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }

        [HttpPut("clientes/{id}")]
        public ActionResult AlterCliente(int id, [FromBody] ClienteObject ClienteData)
        {
            try
            {
                Cliente? cliente = _context.Cliente.Find(id);

                if (cliente is null) return StatusCode(400);

                cliente.Nome = ClienteData.nome;
                cliente.VIP = ClienteData.vip;
                cliente.Ativo = ClienteData.ativo;
                cliente.NecessitaMarketing = ClienteData.necessitaMarketing;
                cliente.DataInicio = ClienteData.dataInicio;
                cliente.MoedaEstrangeira = ClienteData.moedaEstrangeira;
                cliente.NecessitaTI = ClienteData.necessitaTI;
                cliente.SistemaId = ClienteData.sistemaId;

                _context.Cliente.Update(cliente);
                _context.SaveChanges();

                return StatusCode(200, cliente);
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }
        }
    }
}
