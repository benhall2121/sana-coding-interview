class MainController < ApplicationController
  require 'httparty'

  before_action :force_json, only: :search

  def index
  end

  def search
  	search_string = ['first_name', 'last_name', 'state'].map{|v| v + '=' + params[v] if !params[v].blank? && !params[v].nil?}.compact.join('&')

    response = HTTParty.get("https://npiregistry.cms.hhs.gov/api/?#{search_string}&version=2.1")
    @doctors = JSON.parse(response.body)
  end

  private

  def force_json
    request.format = :json
  end
end