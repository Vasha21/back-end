using System.Reflection.Metadata;


namespace APIimobiliaria.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Estado_civil { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Endereco { get; set; }
        public string CPF { get; set; }
        public string ComproRenda { get; set; }
        public string RG { get; set; }
        public string Senha { get; set; }
        
    }
}
