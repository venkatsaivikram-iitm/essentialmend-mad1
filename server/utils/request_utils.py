from database.models import Request
from server.utils.common_utils import generateID

def generateRID ():
    RID = generateID()
    if (Request.query.filter(Request.request_id == RID).first()):
        return generateRID()
    return RID