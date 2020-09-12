using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    /**
    Delete activity
    **/
    public class Delete
    {
        public class Command : IRequest
        {
            // Id of activity to delete
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Unit returns an empty object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                // Get activity to delte by id
                var activity = await _context.Activities.FindAsync(request.Id);
                // If wrong id, throw new exception
                if (activity == null)
                {
                    throw new Exception("Could not find Activity");
                }

                // Remove the activity
                _context.Remove(activity);
                // returns amount of changes, should be bigger than 0
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving Activity");
            }
        }
    }
}