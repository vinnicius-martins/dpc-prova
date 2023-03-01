using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestObjects
{
    public class ContabilidadeObject
    {
        public string Nome { get; set; }
        public string DataInicio { get; set; }
        public string? DataFim { get; set; }
        public int EmpresaId { get; set; }
    }
}
