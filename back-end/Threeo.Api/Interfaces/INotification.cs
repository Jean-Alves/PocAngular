using System;
using System.Collections.Generic;
using Threeo.Api.Classes;

namespace Threeo.Api.Interfaces
{
    public interface INotification
    {
        bool HasNotification();
        List<Notifier> GetNotifications();
        void Handle(Notifier notifier);
    }
}
