using System;
using System.Collections.Generic;
using System.Linq;
using Threeo.Api.Interfaces;

namespace Threeo.Api.Classes
{
    public class Notification:INotification
    {
        private List<Notifier> _notifiers;

        public Notification()
        {
            _notifiers = new List<Notifier>();
        }

        public void Handle(Notifier notificacao)
        {
            _notifiers.Add(notificacao);
        }

      
        public List<Notifier> GetNotifications()
        {
            return _notifiers;
        }

        public bool HasNotification()
        {
            return _notifiers.Any();
        }
    }
}
