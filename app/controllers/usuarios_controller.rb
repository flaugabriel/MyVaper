# frozen_string_literal: true

class UsuariosController < ApplicationController
  def perfil; end

  def configuracao
    @usuario = current_usuario
  end

  def update_passworld
    @usuario = current_usuario

    if @usuario.update(usuario_params)
      bypass_sign_in(@usuario)
      flash[:success] = 'Senha atualizada!'
      redirect_to root_path
    else
      flash[:error] = 'Senha de confirmação não confere com nova senha!'
      redirect_to configuracao_path
    end
  end

  def minhas_vendas
    @pedidos = Pedido.where(usuario_id: current_usuario.id)
  end

  def usuario_params
    params.require(:usuario).permit(:password, :password_confirmation)
  end
end