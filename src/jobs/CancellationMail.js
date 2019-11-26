import moment from 'moment';
import Mail from '../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: './partials/cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: moment(appointment.date)
          .locale('pt-br')
          .format('DD MMMM, H:mm '),
      },
    });
  }
}

export default new CancellationMail();
