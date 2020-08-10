require 'test_helper'

class LojasControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get lojas_index_url
    assert_response :success
  end

end
