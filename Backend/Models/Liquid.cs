using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("Liquids")]
    public class Liquid : Ingridient
    {
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int Volume { get; set; }
        [Column(TypeName = "double precision"), Range(0, 100)]
        public double Degree { get; set; }
    }
}
