

""" Projecting patterns to inherit from itselves """

class Singleton(object):
    __instance = None
    def __new__(cls):
        if not isinstance(cls.__instance, cls):
            cls.__instance = object.__new__(cls)
        return cls.__instance