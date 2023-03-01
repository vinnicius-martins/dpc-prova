using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Data
{
    public class DPC_Context : DbContext
    {
        public DPC_Context(DbContextOptions<DPC_Context> options)
            : base(options)
        {
        }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Contato> Contato { get; set; }
        public DbSet<Sistema> Sistema { get; set; }
        public DbSet<Contabilidade> Contabilidade { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseSerialColumns();

            modelBuilder.Entity<Sistema>().HasData(
                new Sistema()
                {
                    Codigo = 1,
                    Nome = "ERP Financeiro"
                },
                new Sistema
                {
                    Codigo = 2,
                    Nome = "ERP Contábil"
                },
                new Sistema
                {
                    Codigo = 3,
                    Nome = "ERP Fiscal"
                },
                new Sistema
                {
                    Codigo = 4,
                    Nome = "ERP DP"
                }
            );

            modelBuilder.Entity<Cliente>().HasData(
                new Cliente
                {
                    Codigo = 1,
                    Nome = "Cliente Teste 1",
                    Ativo = true,
                    SistemaId = 1,
                    DataInicio = "2023-02-21",
                },
                new Cliente
                {
                    Codigo = 2,
                    Nome = "Cliente Teste 2",
                    Ativo = false,
                    SistemaId = 3,
                    DataInicio = "2023-02-22",
                },
                new Cliente
                {
                    Codigo = 3,
                    Nome = "Cliente Teste 3",
                    Ativo = true,
                    SistemaId = 2,
                    DataInicio = "2023-02-23",
                }
            );

            base.Database.Migrate();
            base.OnModelCreating(modelBuilder);
        }
    }
}