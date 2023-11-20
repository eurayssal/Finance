using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Finance.Models
{
    public class Relatorios
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string CategoriaId { get; set; }
        public string CategoriaName { get; set; }
        public string ContaId { get; set; }
        public string ContaName { get; set; }
        public string ReceitaId { get; set; }
        public string ReceitaName { get; set; }
        public string DespesaId{ get; set;}
        public string DespesaName { get; set;}
        public string Download { get; set; }
    }
}
