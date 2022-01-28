using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("Liquids")]
    public class Liquid : Ingridient
    {
        [Range(0, int.MaxValue)]
        public int Volume { get; set; }
        [Range(0, 100)]
        public double Degree { get; set; }
    }
}
