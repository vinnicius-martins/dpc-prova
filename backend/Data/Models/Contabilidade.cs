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
    [Table("Contabilidade")]
    [PrimaryKey("Codigo")]
    public class Contabilidade
    {
        public int Codigo { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nome { get; set; } = string.Empty;
        public string DataInicio { get; set; }
        public string? DataFim { get; set; }
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}
