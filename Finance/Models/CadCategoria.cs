using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Finance.Models
{
    public class CadCategoria
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        public string TipoCategoria { get; set; }
        public bool Atividade { get; set; }

        //Parte do CadOrcamento
        public string OrcamentoId{ get; set; }
        public string OrcamentoName { get; set; }
    }
}
