using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace IdleAnnouncer
{
  public class IdleTester
  {

    /*
     * Public
     */
    public IdleTester()
    {
      lastInput = new TesterNativeMethods.LASTINPUTINFO();
      lastInput.cbSize = (uint) Marshal.SizeOf(lastInput);
      TesterNativeMethods.GetLastInputInfo(ref lastInput);
      lastTime = lastInput.dwTime;
      Thread thread = new Thread( new ThreadStart(this.UpdateWasIdle) );
      thread.Start();
    }

    public bool WasIdle()
    {
      return wasIdle;
    }
 
    /*
     * Private
     */

    private bool wasIdle;
    private uint lastTime;
    private TesterNativeMethods.LASTINPUTINFO lastInput;

    private void UpdateWasIdle()
    {
      while (true) {
        TesterNativeMethods.GetLastInputInfo(ref lastInput);
        if (lastInput.dwTime == lastTime) {
          wasIdle = true;
        }
        else {
          lastTime = lastInput.dwTime;
          wasIdle = false;
        }
          Thread.Sleep(IdleAnnouncer.ONE_MINUTE);
      }
    }

  }

  /*
   * Native references
   */

  internal static class TesterNativeMethods
  {
    internal struct LASTINPUTINFO
    {
      public uint cbSize;
      public uint dwTime;
    }

    [DllImport("User32.dll")]
    internal static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);
  }

}
