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
    [Table("Contatos")]
    [PrimaryKey("Codigo")]
    public class Contato
    {
        public int Codigo { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}
