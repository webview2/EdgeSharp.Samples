using System.ComponentModel.DataAnnotations;

namespace EdgeSharp.Shared.Models
{
    public class Info
    {
        [Display(Name = "SDK Version")]
        public string SdkVersion { get; set; }

        [Display(Name = "Runtime Version")]
        public string RuntimeVersion { get; set; }
    }
}
