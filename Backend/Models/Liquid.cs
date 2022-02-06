using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    /// <summary>
    /// EF model of liquid component (contains all of ingridient fields)
    /// </summary>
    [Table("Liquids")]
    public class Liquid : Ingridient
    {
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("volume")]
        public int Volume { get; set; }
        [Column(TypeName = "double precision"), Range(0, 100)]
        [JsonProperty("degree")]
        public double Degree { get; set; }
    }
}
