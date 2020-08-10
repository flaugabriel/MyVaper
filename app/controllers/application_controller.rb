# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_usuario!
  before_action :verifica_login_usuario
  before_action :configure_permitted_parameters, if: :devise_controller?

 
  def current_ability
    @current_ability ||= Ability.new(current_usuario)
  end

  rescue_from CanCan::AccessDenied do
    users_redirect
  end

  def users_redirect
    if current_usuario.admin?
      redirect_to admin_path
    elsif current_usuario.gerencia?
      redirect_to loja_path
    end
  end

  def verifica_login_usuario
    if usuario_signed_in?
      if current_usuario.inativo?
        Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
        flash[:error] = 'Usuário inativo na plataforma!'
        redirect_to root_path
      end
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:apelido, :email, :password)}
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:apelido, :email, :password, :current_password)}
  end
end