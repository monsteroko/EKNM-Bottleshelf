using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    public abstract class Ingridient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [Column(TypeName = "text"), Required]
        [JsonProperty("name")]
        public string Name { get; set; }
        [Column(TypeName = "double precision"), Range(0, double.MaxValue)]
        [JsonProperty("price")]
        public double Price { get; set; }
        [Column(TypeName = "text")]
        [JsonProperty("description")]
        public string? Description { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("amount")]
        public int Amount { get; set; }
    }
}
