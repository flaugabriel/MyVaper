class Usuario < ApplicationRecord
  enum perfil: %i[admin cliente loja]
  enum status: %i[ativo inativo em_analise recusado]

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, uniqueness: true
  validates :apelido, uniqueness: true
end
