from database.models import Reviews
from server.utils.common_utils import generateID

def generateReID ():
    RID = generateID()
    if (Reviews.query.filter(Reviews.review_id == RID).first()):
        return generateReID()
    return RID