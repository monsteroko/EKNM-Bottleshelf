using System.ComponentModel.DataAnnotations;

namespace EKNM_Bottleshelf.Models
{
    public class Dry: Ingridient
    {
        [Range(0,double.MaxValue)]
        public int? Weight { get; set; }
    }
}
