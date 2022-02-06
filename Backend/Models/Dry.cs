using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    /// <summary>
    /// EF model of dry component (contains all of ingridient fields)
    /// </summary>
    [Table("Dries")]
    public class Dry: Ingridient
    {
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("weight")]
        public int? Weight { get; set; }
    }
}
