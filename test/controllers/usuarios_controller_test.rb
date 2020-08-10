require 'test_helper'

class UsuariosControllerTest < ActionDispatch::IntegrationTest
  test "should get perfil" do
    get usuarios_perfil_url
    assert_response :success
  end

end
