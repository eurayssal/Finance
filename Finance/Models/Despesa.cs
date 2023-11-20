using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Finance.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Nome")]
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public bool Status { get; set; }

        //Vai ser no mesmo select
        public string ContaId { get; set; }
        public string ContaName { get; set;}
        public string CartaoId { get; set; }
        public string CartaoName { get; set; }

    }
}
