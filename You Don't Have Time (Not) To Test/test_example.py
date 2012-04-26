import unittest
from example import app

class ExampleTest(unittest.TestCase):
    def test_index(self):
        client = app.test_client()
        response = client.get('/')
        self.assertTrue(response.status == "200 OK")
