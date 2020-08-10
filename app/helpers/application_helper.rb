# frozen_string_literal: true

module ApplicationHelper
  def number_to_currency_br(number)
    number_to_currency(number, unit: 'R$ ', separator: ',', delimiter: '.')
  end

  def flash_message
    notification = ''
    %i[success info warning error].each do |type|
      next unless flash[type]

      notification += "<script>
        toastr.#{type}('#{flash[type]}')
      </script>"
    end
    notification.html_safe
  end

  def status(status)
    html = ''
    html += if status
              '<span class="badge badge-success">Ativo</span> '
            else
              '<span class="badge badge-danger">Inativo</span> '
            end
    html.html_safe
  end
end