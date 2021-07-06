using EdgeSharp.Core.Owin;
using System;

namespace EdgeSharp.Razor.Sample
{
    public class Program
    {
        /// <summary> Main entry-point for this application. </summary>
        /// <param name="args"> The arguments to pass in. </param>
        [STAThread]
        public static void Main(string[] args)
        {
            OwinAppBuilder
               .Create(args)
               .UseConfig<SampleConfig>()
               .UseWindow<SampleWindow>()
               .UseApp<SampleOwinApp>()
               .Build()
               .Run();
        }
    }
}
