using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestObjects
{
    public class ClienteObject
    {
        public string nome { get; set; } = string.Empty; 
        public bool ativo { get; set; } = true;
        public int sistemaId { get; set; }
        public string dataInicio { get; set; }
        public bool vip { get; set; }
        public bool necessitaTI { get; set; }
        public bool necessitaMarketing { get; set; }
        public bool moedaEstrangeira { get; set; }
    }
}
