using System;
using Threeo.Api.Interfaces;

namespace Threeo.Api.Classes
{
    public class Notifier
    {
        public Notifier(string mensagem)
        {
            Mensagem = mensagem;
        }

        public string Mensagem { get; }
    }
}
