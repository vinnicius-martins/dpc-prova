using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Data.Models
{
    [Table("Clientes")]
    [PrimaryKey("Codigo")]
    public class Cliente
    {
        public int Codigo { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;
        public bool? Ativo { get; set; } = true;
        public int? SistemaId { get; set; }
        public virtual Sistema? Sistema { get; set; }
        public string? DataInicio { get; set; }
        public bool? VIP { get; set; } = false;
        public bool? NecessitaTI { get; set; } = false;
        public bool? NecessitaMarketing { get; set; } = false;
        public bool? MoedaEstrangeira { get; set; } = false;
        public virtual ICollection<Contato> Contatos { get; set; }
        public virtual ICollection<Contabilidade> Contabilidades { get; set; }
    }
}
