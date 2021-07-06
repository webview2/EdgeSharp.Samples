using EdgeSharp.Core;
using System.Windows;

namespace EdgeSharp.Wpf.Sample
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private AppBuilder<Startup> _appBuilder;
        protected override void OnStartup(StartupEventArgs e)
        {
            _appBuilder = new AppBuilder<Startup>();
            ServiceLocator.Bootstrap(_appBuilder);

           // MainWindow mainWindow = new MainWindow();
            SampleWindow mainWindow = new SampleWindow();
            mainWindow.Show();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            _appBuilder?.Stop();
            base.OnExit(e);
        }
    }
}
