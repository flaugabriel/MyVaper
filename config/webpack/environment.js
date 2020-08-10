const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    moment: 'moment.js',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default'],
    Toastr: 'toastr.js'
  })
)

module.exports = environment