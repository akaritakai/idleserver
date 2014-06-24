using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Net;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace IdleAnnouncer
{
  class IdleTransmitter
  {
    private static readonly WebClient CLIENT = new WebClient();
    private static readonly NameValueCollection DATA = new NameValueCollection();
    private static readonly Uri DESTINATION = new Uri("https://some.url.here/");

    public static void Transmit(bool wasIdle)
    {
      DATA["idle"] = wasIdle ? "true" : "false";
      CLIENT.UploadValuesAsync(DESTINATION, DATA);
    }
  }

}
