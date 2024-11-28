from database.models import Library
from server.utils.common_utils import generateID

def generateFID ():
    FID = generateID()
    if (Library.query.filter(Library.file_id == FID).first()):
        return generateFID()
    return FID