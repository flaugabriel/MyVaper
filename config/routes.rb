Rails.application.routes.draw do
  get 'lojas/index'
  devise_for :usuarios
  get 'usuarios/perfil'
  resources :usuarios
  root 'lojas#index'
  get '/usuario/avisos', to: 'usuarios#avisos', as: 'avisos'
  get '/usuario/minhas_vendas', to: 'usuarios#minhas_vendas', as: 'minhas_vendas'
  get '/usuario/perfil', to: 'usuarios#perfil', as: 'perfil'
  get '/usuario/configuracao', to: 'usuarios#configuracao', as: 'configuracao'
  put '/usuario/configuracao', to: 'usuarios#update_passworld', as: 'update_passworld'
end
