import unittest
from app import app

class AppTest(unittest.TestCase):
    def test_index(self):
        client = app.test_client()
        response = client.get('/')
        self.assertTrue(response.status == '200 OK')
