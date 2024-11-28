from database.database import database
from sqlalchemy.orm import relationship, backref
from sqlalchemy import ForeignKey


class User (database.Model):
    __tablename__ = 'users'
    uid = database.Column(database.String, primary_key=True, unique=True, nullable=False)
    name = database.Column(database.String, nullable=False)
    email = database.Column(database.String, unique=True, nullable=False)
    password = database.Column(database.String, nullable=False)
    role = database.Column(database.String, nullable=False, default="user") # admin | professional | user
    location = database.Column(database.String, nullable=False)
    pincode = database.Column(database.String, nullable=False)
    status = database.Column(database.String, nullable=False, default="active") # active | blocked
    created_at = database.Column(database.String, nullable=False)
    service_requests = relationship("ServiceRequest", foreign_keys="[ServiceRequest.cid]", back_populates="customer")
    professional_requests = relationship("ServiceRequest", foreign_keys="[ServiceRequest.pid]", back_populates="professional")
    reviews_given = relationship("Review", foreign_keys="[Review.reviewer_uid]", back_populates="reviewer")
    reviews_received = relationship("Review", foreign_keys="[Review.reviewee_uid]", back_populates="reviewee")
    professional_profile = relationship("Professional", back_populates="user", uselist=False)
    professional_request = relationship("ProfessionalRequest", back_populates="user", uselist=False)


class Service (database.Model):
    __tablename__ = 'services'
    sid = database.Column(database.String, primary_key=True, unique=True, nullable=False)
    name = database.Column(database.String, unique=True, nullable=False)
    description = database.Column(database.String, nullable=False, default="")
    price = database.Column(database.Numeric, nullable=False)
    service_requests = relationship("ServiceRequest", back_populates="service")
    professionals = relationship("Professional", back_populates="service")


class ServiceRequest (database.Model):
    __tablename__ = 'service_requests'
    reqid = database.Column(database.String, nullable=False, primary_key=True, unique=True)
    cid = database.Column(database.String, ForeignKey('users.uid'), nullable=False)
    pid = database.Column(database.String, ForeignKey('users.uid'), nullable=False)
    sid = database.Column(database.String, ForeignKey('services.sid'), nullable=False)
    status = database.Column(database.String, nullable=False, default="pending") # pending | inprogress | completed | cancelled
    status_info = database.Column(database.String, nullable=False, default="")
    created_at = database.Column(database.String, nullable=False)
    closed_at = database.Column(database.String, nullable=False, default="")
    customer = relationship("User", foreign_keys=[cid], back_populates="service_requests")
    professional = relationship("User", foreign_keys=[pid], back_populates="professional_requests")
    service = relationship("Service", foreign_keys=[sid], back_populates="service_requests")
    reviews = relationship("Review", back_populates="service_request")


class Review (database.Model):
    __tablename__ = 'reviews'
    revid = database.Column(database.String, nullable=False, primary_key=True, unique=True)
    reviewer_uid = database.Column(database.String, ForeignKey('users.uid'), nullable=False)
    reviewee_uid = database.Column(database.String, ForeignKey('users.uid'), nullable=False)
    reqid = database.Column(database.String, ForeignKey('service_requests.reqid'), nullable=False)
    review = database.Column(database.String, nullable=False)
    rating = database.Column(database.String, nullable=False)
    type = database.Column(database.String, nullable=False, default="review") # review | report
    created_at = database.Column(database.String, nullable=False)
    reviewer = relationship("User", foreign_keys=[reviewer_uid], back_populates="reviews_given")
    reviewee = relationship("User", foreign_keys=[reviewee_uid], back_populates="reviews_received")
    service_request = relationship("ServiceRequest", foreign_keys=[reqid], back_populates="reviews")


class Professional (database.Model):
    __tablename__ = 'professionals'
    uid = database.Column(database.String, ForeignKey('users.uid'), nullable=False, primary_key=True, unique=True)
    sid = database.Column(database.String, ForeignKey('services.sid'), nullable=False)
    description = database.Column(database.String, nullable=False)
    experience = database.Column(database.Numeric, nullable=False)
    rating = database.Column(database.Numeric, nullable=False)
    duration = database.Column(database.Numeric, nullable=False)
    price = database.Column(database.Numeric, nullable=False)
    user = relationship("User", foreign_keys=[uid], back_populates="professional_profile")
    service = relationship("Service", foreign_keys=[sid], back_populates="professionals")


class ProfessionalRequest (database.Model):
    __tablename__ = 'professional_requests'
    uid = database.Column(database.String, ForeignKey('users.uid'), nullable=False, primary_key=True, unique=True)
    status = database.Column(database.String, nullable=False, default="pending") # pending | approved | declined
    status_info = database.Column(database.String, nullable=False, default="")
    created_at = database.Column(database.String, nullable=False)
    closed_at = database.Column(database.String, nullable=False)
    user = relationship("User", foreign_keys=[uid], back_populates="professional_request")


# Ensure all models are properly configured
from sqlalchemy.orm import registry
mapper_registry = registry()
mapper_registry.configure()