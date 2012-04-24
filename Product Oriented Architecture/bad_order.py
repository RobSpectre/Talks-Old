class OrderMaker(object):
    def __init__(self):
        self.items = [] 

    def add_item(self, item):
        self.items.append(item)
        return self.items

    def delete_item(self, item):
        for existing_item in self.items:
            if item == existing_item:
                self.items.remove(existing_item)
                return True
        return False

    def update_item(self, item):
        for existing_item in self.items:
            if item == existing_item:
                self.items.remove(existing_tiem)
                self.items.insert(item)
                return True
        return False

    def process_order(self):
        if self.items:
            return "Your order is processed!"
        else:
            return False
