using System.ComponentModel.DataAnnotations;

namespace EKNM_Bottleshelf.Models
{
    public class Liquid : Ingridient
    {
        [Range(0, int.MaxValue)]
        public int Volume { get; set; }
        [Range(0, 100)]
        public double Degree { get; set; }
    }
}
